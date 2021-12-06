import QRCode from "qrcode";

const options = {
  color: {
    dark: "#1A4A83",
    light: "#FFFFFF"
  }
};

/**
 * Describe Qrcode here.
 *
 * The exported method is the entry point for your code when the function is invoked.
 *
 * Following parameters are pre-configured and provided to your function on execution:
 * @param event: represents the data associated with the occurrence of an event, and
 *                 supporting metadata about the source of that occurrence.
 * @param context: represents the connection to Functions and your Salesforce org.
 * @param logger: logging handler used to capture application logs and trace specifically
 *                 to a given execution of a function.
 */

export default async function (event, context, logger) {
  const results = await context.org.dataApi.query(
    "SELECT Id, Name FROM Account"
  );

  let code = await generateQR("www.google.com");
  code = code.replace("data:image/png;base64,", "");
  logger.info(`Code image ${JSON.stringify(code)}`);

  // Create a unit of work that inserts multiple objects.
  const uow = context.org.dataApi.newUnitOfWork();

  // Register a new Account for Creation
  const contentId = uow.registerCreate({
    type: "ContentVersion",
    fields: {
      Title: "QR Code",
      PathOnClient: "qrcode.png",
      VersionData: code,
      origin: "H"
    }
  });
  try {
    // Commit the Unit of Work with all the previous registered operations
    const response = await context.org.dataApi.commitUnitOfWork(uow);
    // Construct the result by getting the Id from the successful inserts
    const result = {
      contentId: response.get(contentId).id
    };
  } catch (err) {
    const errorMessage = `Failed to insert record. Root Cause : ${err.message}`;
    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  return results;
}

async function generateQR(text) {
  try {
    return QRCode.toDataURL(text, options);
  } catch (err) {
    console.log(JSON.stringify(err.message));
  }
}

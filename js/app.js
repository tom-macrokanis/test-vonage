// replace these values with those generated in your TokBox Account
var apiKey = "46914794";
var sessionId =
  "1_MX40NjkxNDc5NH5-MTU5OTY1MTk3NDExOH5RelVtUFVLVVpQVFhlNnFaTTV4NWZyUkx-fg";
var token =
  "T1==cGFydG5lcl9pZD00NjkxNDc5NCZzaWc9YWNiZjZmYWYxNGEyOThkZjc5NTZmZDEwNzljZjA4ZDdjOGM5MWIzODpzZXNzaW9uX2lkPTFfTVg0ME5qa3hORGM1Tkg1LU1UVTVPVFkxTVRrM05ERXhPSDVSZWxWdFVGVkxWVnBRVkZobE5uRmFUVFY0TldaeVVreC1mZyZjcmVhdGVfdGltZT0xNTk5NjUxOTk4Jm5vbmNlPTAuNzUwNTIxNDg0MzUyNzMyMSZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTk5NjU1NTk3JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9";

// Handling all of our errors here by alerting them
function handleError(error) {
  if (error) {
    alert(error.message);
  }
}

// (optional) add server code here
initializeSession();

function initializeSession() {
  var session = OT.initSession(apiKey, sessionId);

  // Subscribe to a newly created stream
  session.on("streamCreated", function (event) {
    session.subscribe(
      event.stream,
      "subscriber",
      {
        insertMode: "append",
        width: "100%",
        height: "100%",
      },
      handleError
    );
  });

  // Create a publisher
  var publisher = OT.initPublisher(
    "publisher",
    {
      insertMode: "append",
      width: "100%",
      height: "100%",
    },
    handleError
  );

  // Connect to the session
  session.connect(token, function (error) {
    // If the connection is successful, initialize a publisher and publish to the session
    if (error) {
      handleError(error);
    } else {
      session.publish(publisher, handleError);
    }
  });
}

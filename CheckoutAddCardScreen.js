import * as React from "react";
import { WebView } from "react-native-webview";
import { useContext, useLayoutEffect } from "react";
import { Context } from "./App";

const CheckoutAddCardScreen = ({ navigation }) => {
  const { state } = useContext(Context);

  const { accessToken } = state;

  console.table({ accessToken });

  return (
    <WebView
      onMessage={(event) => {
        const { data } = event.nativeEvent;
        console.log(data);
      }}
      style={{ flex: 1 }}
      originWhitelist={["*"]}
      source={{
        html: `
<!DOCTYPE html>
<html>

<style> 
body{
margin: 0;
}
iframe{
border: none;
}
</style>
<body>
<script src="https://xiecomm.paymetric.com/DIeComm/Scripts/XIFrame/XIFrame-1.2.0.js"></script>

<script>
    function submitForm() {
        window.ReactNativeWebView.postMessage("submit")
        try{
            $XIFrame.submit({
            iFrameId: 'dieCommFrame',
            targetUrl:'https://cert-xiecomm.paymetric.com/diecomm/View/Iframe/a94c7413-d1f1-45e3-9427-00408707bf69/${accessToken}/True',
            onSuccess: function(msg) {
                window.ReactNativeWebView.postMessage(msg)
            },
            onError: function(msg) {
                window.ReactNativeWebView.postMessage(msg)
                alert("Error function : " + msg);
            }
        });
        }
       catch (e){
        window.ReactNativeWebView.postMessage(e.message)
       }
    }
</script>

<iframe id="dieCommFrame" name="paymetric" type="text/html" width="600" height="300"
        src="https://cert-xiecomm.paymetric.com/diecomm/View/Iframe/a94c7413-d1f1-45e3-9427-00408707bf69/${accessToken}/True"></iframe>
<input type="button" value="Submit Payment" onClick="submitForm(); return false;">
</body>
</html>        
        `,
      }}
    />
  );
};

export default CheckoutAddCardScreen;

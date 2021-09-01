import { useRef, useEffect } from "react";
import "./preview.css";

// recieve some bundled code and put it to the iframe
interface PreviewProps {
  code: string;
  err: string;
}
const html = `
    <html>
      <head>
      <style>
        html{
          background-color: white;
        }
      </style>
      </head>
      <body>
        <div id="root">
          <script>
            const handleError = (error) => {
              const root = document.querySelector('#root');
                root.innerHTML = '<div style="color: red"><h4>Runtime Error</h4>' + err +'</div>'; 
                console.error(err);
            }
            window.addEventListener('error', (event) => {
              event.preventDefault();
              handleError(event.error);
            });

            window.addEventListener('message', (event) => {
              try{
                eval(event.data);
              }catch(err){
                handleError(err);
              }
            }, false)
          </script>
        </div>
      </body>
    </html>
  
  `;

const Preview: React.FC<PreviewProps> = ({ code, err }) => {
  const iframeRef = useRef<any>();
  useEffect(() => {
    iframeRef.current.srcdoc = html;
    // rev sec13 162
    setTimeout(() => {
      iframeRef.current.contentWindow.postMessage(code, "*");
    }, 50);
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        ref={iframeRef}
        title="preview"
        sandbox="allow-scripts"
        srcDoc={html}
      />
      {err && <div className="preview-error">{err}</div>}
    </div>
  );
};

export default Preview;

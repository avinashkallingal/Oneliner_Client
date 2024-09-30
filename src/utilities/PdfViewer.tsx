import { useEffect, useRef } from 'react';
import WebViewer from '@pdftron/webviewer';
import { toast } from 'sonner';
interface PdfViewerProps {
    initialDoc: string; // Type definition for the prop
  }

function PdfViewer({ initialDoc }: PdfViewerProps) {
  const viewerCanvas = useRef<HTMLDivElement>(null);


  //
  
  useEffect(() => {
    // Function to prevent 'Ctrl+C', 'Ctrl+S', 'Cmd+C', and 'Cmd+S'
    const preventShortcuts = (e: KeyboardEvent) => {
      // Check if Ctrl or Command is pressed along with 'C' or 'S'
      if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 's')) {
        e.preventDefault(); // Prevent default action of copy or save
        if (e.key === 'c') {
          alert('Copying is disabled!');
        } else if (e.key === 's') {
          alert('Saving is disabled!');
        }
      }
    };

    // Add the event listener to the document to listen for keydown events
    document.addEventListener('keydown', preventShortcuts);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', preventShortcuts);
    };
  }, []);
  //

  useEffect(() => {
    if (viewerCanvas.current) {
      WebViewer(
        {
          path: '/public',
          initialDoc: initialDoc,
        },
        viewerCanvas.current
      ).then((instance) => {
        // You can interact with the WebViewer instance here if needed
        const { documentViewer, UI } = instance;

        // Disable the download and saveAs buttons
        UI.disableElements(['downloadButton', 'saveAsButton', 'printButton']);
        
        // Disable the text selection feature to prevent copying
        instance.disableFeatures([instance.Feature.TextSelection]);

        // Once the document is fully loaded
     

        //
      });
    }
  }, []);

  return (
    <div>
      
      <div ref={viewerCanvas} style={{ height: '100vh', width:"100vw",marginTop:"5%" }}></div>
     
    </div>
  );
}

export default PdfViewer;

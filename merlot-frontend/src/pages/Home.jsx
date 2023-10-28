import { useState, useEffect } from 'react';
import { Sidebar } from '../components/sidebar';
import { Editor } from '../components/Editor';
import { Preview } from '../components/Preview';
import { Header } from '../components/Header';

function Home() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [showFull, setShowFull] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(null);
  const [content, setContent] = useState('');

  useEffect(() => {
    const rootStyles = getComputedStyle(document.documentElement);
    setSidebarWidth(rootStyles.getPropertyValue('--sidebar-width'));
  }, []);

  return (
    <div className="home">
      <Header
        toggleSidebar={setShowSidebar}
        toggleFullView={setShowFull}
        isFull={showFull}
      />
      <main>
        {showSidebar && <Sidebar />}
        <div
          className="content"
          style={{ marginLeft: showSidebar ? sidebarWidth : 0 }}
        >
          {showFull ? (
            <Preview content={content} isFullScreen={showFull} />
          ) : (
            <>
              <Editor setContent={setContent} content={content} />
              <Preview content={content} isFullScreen={showFull} />
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default Home;

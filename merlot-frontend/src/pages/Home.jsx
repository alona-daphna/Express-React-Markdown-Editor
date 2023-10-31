import { useState, useEffect, useRef } from 'react';
import { Sidebar } from '../components/sidebar';
import { Editor } from '../components/Editor';
import { Preview } from '../components/Preview';
import { Header } from '../components/Header';

function Home() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [showFull, setShowFull] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(null);
  const [content, setContent] = useState('');
  const [isMobileView, setIsMobileView] = useState(false);
  const [isShiftPressed, setIsShiftPressed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 800);
    };

    window.addEventListener('fileCreated', () => {
      setContent('');
    });

    window.addEventListener('resize', handleResize);

    const rootStyles = getComputedStyle(document.documentElement);
    setSidebarWidth(rootStyles.getPropertyValue('--sidebar-width'));

    handleResize();

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('fileCreated', () => {
        setContent('');
      });

      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleKeyDown = (e) => {};

  return (
    <div className="home">
      <Header
        toggleSidebar={setShowSidebar}
        toggleFullView={setShowFull}
        isFull={showFull}
      />
      <main>
        <div style={{ visibility: showSidebar ? 'visible' : 'hidden' }}>
          <Sidebar />
        </div>
        <div
          className="content"
          style={{
            marginLeft: showSidebar && !isMobileView ? sidebarWidth : 0,
          }}
        >
          {showFull ? (
            <Preview
              content={content}
              isFullScreen={showFull}
              setContent={setContent}
            />
          ) : (
            <>
              <Editor setContent={setContent} content={content} />
              {!isMobileView && (
                <Preview
                  content={content}
                  isFullScreen={showFull}
                  setContent={setContent}
                />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default Home;

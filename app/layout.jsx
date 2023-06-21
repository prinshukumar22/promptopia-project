import Nav from "@components/Nav";
import "@styles/globals.css";
import Provider from "@components/Provider";
export const metadata = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <Provider>
        <body>
          <div className="main">
            <div className="gradient"></div>
          </div>
          <main className="app">
            <Nav></Nav>
            {children}
          </main>
          {/* All the page components will go in this */}
        </body>
      </Provider>
    </html>
  );
};

export default RootLayout;

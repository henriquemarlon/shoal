import type { FC } from "react";
import { BrowserRouter } from "react-router-dom";
import Providers from "./providers/PrivyProviders";


const App: FC = () => {
  return (
    <Providers>
      <BrowserRouter>
          aaaa
      </BrowserRouter>
    </Providers>
  );
};

export default App;

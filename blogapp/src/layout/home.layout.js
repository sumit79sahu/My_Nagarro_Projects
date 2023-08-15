import React from 'react';
import Header from '../component/header.component';
import Posts from '../component/posts.component';
export const blogContext = React.createContext();
function Home(props) {
  return (
    <div>
      <Header />
      <blogContext.Provider value={props.Data}>
        <Posts />
      </blogContext.Provider>

    </div>
  );
}

export default Home;
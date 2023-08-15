import Header from '../component/header.component';
import Add from '../component/add.component';
import React from 'react';


export const blogContext = React.createContext();
function NewPost(props) {
  return (
    <div>
      <Header />
      <blogContext.Provider value={props}>
        <Add />
      </blogContext.Provider>

    </div>
  );
}

export default NewPost;
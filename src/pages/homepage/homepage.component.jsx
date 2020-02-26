import React from 'react';
import { Route } from "react-router-dom";

import './homepage.styles.scss';
import Directory from '../../components/directory/directory.component';
import CollectionPage from "../collection/collection.component";

const HomePage = ({match}) => (
    <div className='homepage'>
        <Directory/>
        <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
    </div>
)

export default HomePage;
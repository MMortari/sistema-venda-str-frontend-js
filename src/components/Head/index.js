import React, { Fragment } from 'react';

import './style.scss';

const Head = ({ title, breadcrumb, children }) => (
    <Fragment>
      <div className="head">
        <div>
          <h1>{title}</h1>

          <div className="breadcrumbList">
            <ul>
              {breadcrumb.map((data, index) => (
                <Fragment key={index}>
                  <li>{data}</li>
                  {index + 1 < breadcrumb.length && (<span><i className="fa fa-chevron-right"></i></span>)}
                </Fragment>
              ))}
            </ul>
          </div>
        </div>
        <div>
          { children }
        </div>
      </div>

      <hr />
    </Fragment>
  );

export default Head;

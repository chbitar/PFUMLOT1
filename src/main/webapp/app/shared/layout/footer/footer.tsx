import './footer.scss';

import React from 'react';
import { Translate } from 'react-jhipster';
import { Col, Row } from 'reactstrap';

const Footer = props => (
  <div className="footer page-content">
    <Row>
      <Col>
        <div className="footer-copyright text-center py-3">
          © 2020 Copyright:
          <a href="https://www.ostelea.ma/"> ostelea.ma</a>
        </div>
      </Col>
    </Row>
  </div>
);

export default Footer;

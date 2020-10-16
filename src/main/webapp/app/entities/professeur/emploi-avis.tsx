import axios from 'axios';
import fileDownload from 'react-file-download';
import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, ICrudGetAction, openFile, byteSize, TextFormat, translate } from 'react-jhipster';
import { IRootState } from 'app/shared/reducers';
import { getDocumentByTypeDocument as getDocuments } from 'app/entities/document/document.reducer';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT, AUTHORITIES } from 'app/config/constants';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import value from '*.json';

export interface IEmploiEtAvisProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EmploiEtAvis extends React.Component<IEmploiEtAvisProps> {
  componentDidMount() {
    this.props.getDocuments('PROFESSEUR');
  }

  render() {
    const { documentList } = this.props;
    return (
      <div>
        <Row>
          <div>
            <Row>
              <Col md="6">
                <span className="badge badge-warning">Emploi de temps et Avis</span>
                {documentList &&
                  documentList.length > 0 &&
                  documentList.map((document, i) => (
                    <>
                      <dt>
                        <span id={document.titre} />
                      </dt>
                      <dd>
                        <div key={`entity-${i}`}>
                          {document.data ? (
                            <div>
                              <a onClick={openFile(document.dataContentType, document.data)}>
                                <FontAwesomeIcon icon="file-pdf" />
                                {document.titre}
                                &nbsp;
                              </a>
                              <span id={document.titre}>
                                {document.dataContentType}, {byteSize(document.data)}
                              </span>
                            </div>
                          ) : null}
                        </div>
                      </dd>
                    </>
                  ))}
              </Col>
            </Row>
          </div>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ authentication, document }: IRootState) => ({
  isProfesseur: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.PROF]),
  documentList: document.entities
});

const mapDispatchToProps = { getDocuments };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmploiEtAvis);

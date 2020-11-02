import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './professeur.reducer';
import { IProfesseur } from 'app/shared/model/professeur.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { getDocumentByTypeDocument as getDocuments } from 'app/entities/document/document.reducer';

export interface IProfesseurDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ProfesseurDetail extends React.Component<IProfesseurDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
    this.props.getDocuments('PROFESSEUR');
  }

  render() {
    const { professeurEntity, documentList } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="pfumApp.professeur.detail.title">Professeur</Translate> [
            <b>{professeurEntity.nom + ' ' + professeurEntity.prenom}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="nom">
                <Translate contentKey="pfumApp.professeur.nom">Nom</Translate>
              </span>
            </dt>
            <dd>{professeurEntity.nom}</dd>
            <dt>
              <span id="prenom">
                <Translate contentKey="pfumApp.professeur.prenom">Prenom</Translate>
              </span>
            </dt>
            <dd>{professeurEntity.prenom}</dd>
            <dt>
              <span id="telephone">
                <Translate contentKey="pfumApp.professeur.telephone">Telephone</Translate>
              </span>
            </dt>
            <dd>{professeurEntity.telephone}</dd>
            <dt>
              <span id="email">
                <Translate contentKey="pfumApp.professeur.email">Email</Translate>
              </span>
            </dt>
            <dd>{professeurEntity.email}</dd>
            <dt>
              <span id="etablissement">
                <Translate contentKey="pfumApp.professeur.etablissement">Etablissement</Translate>
              </span>
            </dt>
            <dd>{professeurEntity.etablissement}</dd>
            <dt>
              <span id="grade">
                <Translate contentKey="pfumApp.professeur.grade">Grade</Translate>
              </span>
            </dt>
            <dd>{professeurEntity.grade}</dd>
            <dt>
              <span id="diplome">
                <Translate contentKey="pfumApp.professeur.diplome">Diplome</Translate>
              </span>
            </dt>
            <dd>{professeurEntity.diplome}</dd>
            <dt>
              <span id="cin">
                <Translate contentKey="pfumApp.professeur.cin">Cin</Translate>
              </span>
            </dt>
            <dd>{professeurEntity.cin}</dd>
            <dt>
              <span id="rib">
                <Translate contentKey="pfumApp.professeur.rib">Rib</Translate>
              </span>
            </dt>
            <dd>{professeurEntity.rib}</dd>
            <dt>
              <span id="diplomePj">Document joint</span>
            </dt>
            <dd>
              {professeurEntity.diplomePj ? (
                <div>
                  <a onClick={openFile(professeurEntity.diplomePjContentType, professeurEntity.diplomePj)}>
                    <img
                      src={`data:${professeurEntity.diplomePjContentType};base64,${professeurEntity.diplomePj}`}
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                  <span>
                    {professeurEntity.diplomePjContentType}, {byteSize(professeurEntity.diplomePj)}
                  </span>
                </div>
              ) : (
                'Aucun document joint'
              )}
            </dd>
            <br />
            <dt>
              <span className="badge badge-warning">Emploi du temps et Avis</span>
            </dt>
            {documentList &&
              documentList.length > 0 &&
              documentList.map((document, i) => (
                <>
                  <dd>
                    {' '}
                    <span id={document.titre} />
                  </dd>
                  <dd>
                    {document.data ? (
                      <div>
                        <a onClick={openFile(document.dataContentType, document.data)}>
                          <FontAwesomeIcon icon="file-pdf" />
                          {document.titre}
                          &nbsp;
                        </a>
                        <span id={document.titre} />
                      </div>
                    ) : null}
                  </dd>
                </>
              ))}
          </dl>
          <Button tag={Link} to="/entity/professeur" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/professeur/${professeurEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ professeur, document }: IRootState) => ({
  professeurEntity: professeur.entity,
  documentList: document.entities
});

const mapDispatchToProps = { getEntity, getDocuments };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfesseurDetail);

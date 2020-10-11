import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './espace-etudiant.reducer';
import { IEspaceEtudiant } from 'app/shared/model/espace-etudiant.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEspaceEtudiantDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EspaceEtudiantDetail extends React.Component<IEspaceEtudiantDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { espaceEtudiantEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="pfumv10App.espaceEtudiant.detail.title">EspaceEtudiant</Translate> [<b>{espaceEtudiantEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="emploiDuTemps">
                <Translate contentKey="pfumv10App.espaceEtudiant.emploiDuTemps">Emploi Du Temps</Translate>
              </span>
            </dt>
            <dd>
              {espaceEtudiantEntity.emploiDuTemps ? (
                <div>
                  <a onClick={openFile(espaceEtudiantEntity.emploiDuTempsContentType, espaceEtudiantEntity.emploiDuTemps)}>
                    <img
                      src={`data:${espaceEtudiantEntity.emploiDuTempsContentType};base64,${espaceEtudiantEntity.emploiDuTemps}`}
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                  <span>
                    {espaceEtudiantEntity.emploiDuTempsContentType}, {byteSize(espaceEtudiantEntity.emploiDuTemps)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>
              <Translate contentKey="pfumv10App.espaceEtudiant.user">User</Translate>
            </dt>
            <dd>{espaceEtudiantEntity.user ? espaceEtudiantEntity.user.id : ''}</dd>
            <dt>
              <Translate contentKey="pfumv10App.espaceEtudiant.etudiantLicence">Etudiant Licence</Translate>
            </dt>
            <dd>{espaceEtudiantEntity.etudiantLicence ? espaceEtudiantEntity.etudiantLicence.id : ''}</dd>
            <dt>
              <Translate contentKey="pfumv10App.espaceEtudiant.etudiantMaster">Etudiant Master</Translate>
            </dt>
            <dd>{espaceEtudiantEntity.etudiantMaster ? espaceEtudiantEntity.etudiantMaster.id : ''}</dd>
            <dt>
              <Translate contentKey="pfumv10App.espaceEtudiant.etudiantExecutif">Etudiant Executif</Translate>
            </dt>
            <dd>{espaceEtudiantEntity.etudiantExecutif ? espaceEtudiantEntity.etudiantExecutif.id : ''}</dd>
            <dt>
              <Translate contentKey="pfumv10App.espaceEtudiant.calendrier">Calendrier</Translate>
            </dt>
            <dd>{espaceEtudiantEntity.calendrier ? espaceEtudiantEntity.calendrier.id : ''}</dd>
            <dt>
              <Translate contentKey="pfumv10App.espaceEtudiant.absence">Absence</Translate>
            </dt>
            <dd>{espaceEtudiantEntity.absence ? espaceEtudiantEntity.absence.id : ''}</dd>
            <dt>
              <Translate contentKey="pfumv10App.espaceEtudiant.annonce">Annonce</Translate>
            </dt>
            <dd>{espaceEtudiantEntity.annonce ? espaceEtudiantEntity.annonce.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/espace-etudiant" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/espace-etudiant/${espaceEtudiantEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ espaceEtudiant }: IRootState) => ({
  espaceEtudiantEntity: espaceEtudiant.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EspaceEtudiantDetail);

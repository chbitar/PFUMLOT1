import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './etablissement.reducer';
import { IEtablissement } from 'app/shared/model/etablissement.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEtablissementDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EtablissementDetail extends React.Component<IEtablissementDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { etablissementEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="pfumv10App.etablissement.detail.title">Etablissement</Translate> [<b>{etablissementEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="nomEcole">
                <Translate contentKey="pfumv10App.etablissement.nomEcole">Nom Ecole</Translate>
              </span>
            </dt>
            <dd>{etablissementEntity.nomEcole}</dd>
            <dt>
              <span id="adresse">
                <Translate contentKey="pfumv10App.etablissement.adresse">Adresse</Translate>
              </span>
            </dt>
            <dd>{etablissementEntity.adresse}</dd>
            <dt>
              <span id="rc">
                <Translate contentKey="pfumv10App.etablissement.rc">Rc</Translate>
              </span>
            </dt>
            <dd>{etablissementEntity.rc}</dd>
            <dt>
              <span id="ice">
                <Translate contentKey="pfumv10App.etablissement.ice">Ice</Translate>
              </span>
            </dt>
            <dd>{etablissementEntity.ice}</dd>
            <dt>
              <span id="tp">
                <Translate contentKey="pfumv10App.etablissement.tp">Tp</Translate>
              </span>
            </dt>
            <dd>{etablissementEntity.tp}</dd>
            <dt>
              <span id="identiteFiche">
                <Translate contentKey="pfumv10App.etablissement.identiteFiche">Identite Fiche</Translate>
              </span>
            </dt>
            <dd>{etablissementEntity.identiteFiche}</dd>
            <dt>
              <span id="logo">
                <Translate contentKey="pfumv10App.etablissement.logo">Logo</Translate>
              </span>
            </dt>
            <dd>
              {etablissementEntity.logo ? (
                <div>
                  <a onClick={openFile(etablissementEntity.logoContentType, etablissementEntity.logo)}>
                    <img
                      src={`data:${etablissementEntity.logoContentType};base64,${etablissementEntity.logo}`}
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                  <span>
                    {etablissementEntity.logoContentType}, {byteSize(etablissementEntity.logo)}
                  </span>
                </div>
              ) : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/etablissement" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/etablissement/${etablissementEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ etablissement }: IRootState) => ({
  etablissementEntity: etablissement.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EtablissementDetail);

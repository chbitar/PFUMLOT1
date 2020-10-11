import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, setBlob, reset } from './etablissement.reducer';
import { IEtablissement } from 'app/shared/model/etablissement.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEtablissementUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IEtablissementUpdateState {
  isNew: boolean;
}

export class EtablissementUpdate extends React.Component<IEtablissementUpdateProps, IEtablissementUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { etablissementEntity } = this.props;
      const entity = {
        ...etablissementEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/etablissement');
  };

  render() {
    const { etablissementEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const { logo, logoContentType } = etablissementEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="pfumv10App.etablissement.home.createOrEditLabel">
              <Translate contentKey="pfumv10App.etablissement.home.createOrEditLabel">Create or edit a Etablissement</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : etablissementEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="etablissement-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="etablissement-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nomEcoleLabel" for="etablissement-nomEcole">
                    <Translate contentKey="pfumv10App.etablissement.nomEcole">Nom Ecole</Translate>
                  </Label>
                  <AvField id="etablissement-nomEcole" type="text" name="nomEcole" />
                </AvGroup>
                <AvGroup>
                  <Label id="adresseLabel" for="etablissement-adresse">
                    <Translate contentKey="pfumv10App.etablissement.adresse">Adresse</Translate>
                  </Label>
                  <AvField id="etablissement-adresse" type="text" name="adresse" />
                </AvGroup>
                <AvGroup>
                  <Label id="rcLabel" for="etablissement-rc">
                    <Translate contentKey="pfumv10App.etablissement.rc">Rc</Translate>
                  </Label>
                  <AvField id="etablissement-rc" type="text" name="rc" />
                </AvGroup>
                <AvGroup>
                  <Label id="iceLabel" for="etablissement-ice">
                    <Translate contentKey="pfumv10App.etablissement.ice">Ice</Translate>
                  </Label>
                  <AvField id="etablissement-ice" type="text" name="ice" />
                </AvGroup>
                <AvGroup>
                  <Label id="tpLabel" for="etablissement-tp">
                    <Translate contentKey="pfumv10App.etablissement.tp">Tp</Translate>
                  </Label>
                  <AvField id="etablissement-tp" type="text" name="tp" />
                </AvGroup>
                <AvGroup>
                  <Label id="identiteFicheLabel" for="etablissement-identiteFiche">
                    <Translate contentKey="pfumv10App.etablissement.identiteFiche">Identite Fiche</Translate>
                  </Label>
                  <AvField id="etablissement-identiteFiche" type="text" name="identiteFiche" />
                </AvGroup>
                <AvGroup>
                  <AvGroup>
                    <Label id="logoLabel" for="logo">
                      <Translate contentKey="pfumv10App.etablissement.logo">Logo</Translate>
                    </Label>
                    <br />
                    {logo ? (
                      <div>
                        <a onClick={openFile(logoContentType, logo)}>
                          <img src={`data:${logoContentType};base64,${logo}`} style={{ maxHeight: '100px' }} />
                        </a>
                        <br />
                        <Row>
                          <Col md="11">
                            <span>
                              {logoContentType}, {byteSize(logo)}
                            </span>
                          </Col>
                          <Col md="1">
                            <Button color="danger" onClick={this.clearBlob('logo')}>
                              <FontAwesomeIcon icon="times-circle" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ) : null}
                    <input id="file_logo" type="file" onChange={this.onBlobChange(true, 'logo')} accept="image/*" />
                    <AvInput type="hidden" name="logo" value={logo} />
                  </AvGroup>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/etablissement" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  etablissementEntity: storeState.etablissement.entity,
  loading: storeState.etablissement.loading,
  updating: storeState.etablissement.updating,
  updateSuccess: storeState.etablissement.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EtablissementUpdate);

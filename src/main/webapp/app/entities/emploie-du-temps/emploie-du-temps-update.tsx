import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, setBlob, reset } from './emploie-du-temps.reducer';
import { IEmploieDuTemps } from 'app/shared/model/emploie-du-temps.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEmploieDuTempsUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IEmploieDuTempsUpdateState {
  isNew: boolean;
}

export class EmploieDuTempsUpdate extends React.Component<IEmploieDuTempsUpdateProps, IEmploieDuTempsUpdateState> {
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
      const { emploieDuTempsEntity } = this.props;
      const entity = {
        ...emploieDuTempsEntity,
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
    this.props.history.push('/entity/emploie-du-temps');
  };

  render() {
    const { emploieDuTempsEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const { emploieDuTemps, emploieDuTempsContentType } = emploieDuTempsEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="pfumv10App.emploieDuTemps.home.createOrEditLabel">
              <Translate contentKey="pfumv10App.emploieDuTemps.home.createOrEditLabel">Create or edit a EmploieDuTemps</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : emploieDuTempsEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="emploie-du-temps-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="emploie-du-temps-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <AvGroup>
                    <Label id="emploieDuTempsLabel" for="emploieDuTemps">
                      <Translate contentKey="pfumv10App.emploieDuTemps.emploieDuTemps">Emploie Du Temps</Translate>
                    </Label>
                    <br />
                    {emploieDuTemps ? (
                      <div>
                        <a onClick={openFile(emploieDuTempsContentType, emploieDuTemps)}>
                          <Translate contentKey="entity.action.open">Open</Translate>
                        </a>
                        <br />
                        <Row>
                          <Col md="11">
                            <span>
                              {emploieDuTempsContentType}, {byteSize(emploieDuTemps)}
                            </span>
                          </Col>
                          <Col md="1">
                            <Button color="danger" onClick={this.clearBlob('emploieDuTemps')}>
                              <FontAwesomeIcon icon="times-circle" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ) : null}
                    <input id="file_emploieDuTemps" type="file" onChange={this.onBlobChange(false, 'emploieDuTemps')} />
                    <AvInput type="hidden" name="emploieDuTemps" value={emploieDuTemps} />
                  </AvGroup>
                </AvGroup>
                <AvGroup>
                  <Label id="programmeLabel" for="emploie-du-temps-programme">
                    <Translate contentKey="pfumv10App.emploieDuTemps.programme">Programme</Translate>
                  </Label>
                  <AvInput
                    id="emploie-du-temps-programme"
                    type="select"
                    className="form-control"
                    name="programme"
                    value={(!isNew && emploieDuTempsEntity.programme) || 'LICENCE'}
                  >
                    <option value="LICENCE">{translate('pfumv10App.Programme.LICENCE')}</option>
                    <option value="MASTER">{translate('pfumv10App.Programme.MASTER')}</option>
                    <option value="MASTER_EXECUTIF">{translate('pfumv10App.Programme.MASTER_EXECUTIF')}</option>
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/emploie-du-temps" replace color="info">
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
  emploieDuTempsEntity: storeState.emploieDuTemps.entity,
  loading: storeState.emploieDuTemps.loading,
  updating: storeState.emploieDuTemps.updating,
  updateSuccess: storeState.emploieDuTemps.updateSuccess
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
)(EmploieDuTempsUpdate);

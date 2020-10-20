import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IEtudiantsExecutif } from 'app/shared/model/etudiants-executif.model';
import { getEntities as getEtudiantsExecutifs } from 'app/entities/etudiants-executif/etudiants-executif.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './autre-doc.reducer';
import { IAutreDoc } from 'app/shared/model/autre-doc.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAutreDocUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IAutreDocUpdateState {
  isNew: boolean;
  etudiantexecId: string;
}

export class AutreDocUpdate extends React.Component<IAutreDocUpdateProps, IAutreDocUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      etudiantexecId: '0',
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

    this.props.getEtudiantsExecutifs();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { autreDocEntity } = this.props;
      const entity = {
        ...autreDocEntity,
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
    this.props.history.push('/entity/autre-doc');
  };

  render() {
    const { autreDocEntity, etudiantsExecutifs, loading, updating } = this.props;
    const { isNew } = this.state;

    const { data, dataContentType } = autreDocEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="pfumv10App.autreDoc.home.createOrEditLabel">
              <Translate contentKey="pfumv10App.autreDoc.home.createOrEditLabel">Create or edit a AutreDoc</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : autreDocEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="autre-doc-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="autre-doc-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="titreLabel" for="autre-doc-titre">
                    <Translate contentKey="pfumv10App.autreDoc.titre">Titre</Translate>
                  </Label>
                  <AvField id="autre-doc-titre" type="text" name="titre" />
                </AvGroup>
                <AvGroup>
                  <AvGroup>
                    <Label id="dataLabel" for="data">
                      <Translate contentKey="pfumv10App.autreDoc.data">Data</Translate>
                    </Label>
                    <br />
                    {data ? (
                      <div>
                        <a onClick={openFile(dataContentType, data)}>
                          <Translate contentKey="entity.action.open">Open</Translate>
                        </a>
                        <br />
                        <Row>
                          <Col md="11">
                            <span>
                              {dataContentType}, {byteSize(data)}
                            </span>
                          </Col>
                          <Col md="1">
                            <Button color="danger" onClick={this.clearBlob('data')}>
                              <FontAwesomeIcon icon="times-circle" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ) : null}
                    <input id="file_data" type="file" onChange={this.onBlobChange(false, 'data')} />
                    <AvInput type="hidden" name="data" value={data} />
                  </AvGroup>
                </AvGroup>
                <AvGroup>
                  <Label for="autre-doc-etudiantexec">
                    <Translate contentKey="pfumv10App.autreDoc.etudiantexec">Etudiantexec</Translate>
                  </Label>
                  <AvInput id="autre-doc-etudiantexec" type="select" className="form-control" name="etudiantexec.id">
                    <option value="" key="0" />
                    {etudiantsExecutifs
                      ? etudiantsExecutifs.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/autre-doc" replace color="info">
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
  etudiantsExecutifs: storeState.etudiantsExecutif.entities,
  autreDocEntity: storeState.autreDoc.entity,
  loading: storeState.autreDoc.loading,
  updating: storeState.autreDoc.updating,
  updateSuccess: storeState.autreDoc.updateSuccess
});

const mapDispatchToProps = {
  getEtudiantsExecutifs,
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
)(AutreDocUpdate);

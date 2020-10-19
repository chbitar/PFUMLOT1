import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, setBlob, reset } from './document.reducer';
import { IDocument } from 'app/shared/model/document.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDocumentUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IDocumentUpdateState {
  isNew: boolean;
}

export class DocumentUpdate extends React.Component<IDocumentUpdateProps, IDocumentUpdateState> {
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
      const { documentEntity } = this.props;
      const entity = {
        ...documentEntity,
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
    this.props.history.push('/entity/document');
  };

  render() {
    const { documentEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const { data, dataContentType } = documentEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="pfumv10App.document.home.createOrEditLabel">Charger ou éditer un document</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : documentEntity} onSubmit={this.saveEntity}>
                <AvGroup>
                  <Label id="titreLabel" for="document-titre">
                    <Translate contentKey="pfumv10App.document.titre">Titre</Translate>
                  </Label>
                  <AvField id="document-titre" type="text" name="titre" />
                </AvGroup>
                <AvGroup>
                  <AvGroup>
                    <Label id="dataLabel" for="data" />
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
                  <Label id="typeDocumentLabel" for="document-typeDocument">
                    <Translate contentKey="pfumv10App.document.typeDocument">Source</Translate>
                  </Label>
                  <AvInput
                    id="filiere-programme"
                    type="select"
                    className="form-control"
                    name="typeDocument"
                    value={(!isNew && documentEntity.typeDocument) || 'PROFESSEUR'}
                  >
                    <option value="PROFESSEUR">PROFESSEUR</option>
                    <option value="LICENCE">LICENCE</option>
                    <option value="MASTER_EXECUTIF">MASTER_EXECUTIF</option>
                    <option value="MASTER">MASTER</option>
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/document" replace color="info">
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
  documentEntity: storeState.document.entity,
  loading: storeState.document.loading,
  updating: storeState.document.updating,
  updateSuccess: storeState.document.updateSuccess
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
)(DocumentUpdate);

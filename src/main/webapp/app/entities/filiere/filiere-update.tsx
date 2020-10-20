import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IEtablissement } from 'app/shared/model/etablissement.model';
import { getEntities as getEtablissements } from 'app/entities/etablissement/etablissement.reducer';
import { ITableauDeBoard } from 'app/shared/model/tableau-de-board.model';
import { getEntities as getTableauDeBoards } from 'app/entities/tableau-de-board/tableau-de-board.reducer';
import { getEntity, updateEntity, createEntity, reset } from './filiere.reducer';
import { IFiliere } from 'app/shared/model/filiere.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IFiliereUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IFiliereUpdateState {
  isNew: boolean;
  etablissementId: string;
  boardId: string;
}

export class FiliereUpdate extends React.Component<IFiliereUpdateProps, IFiliereUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      etablissementId: '0',
      boardId: '0',
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

    this.props.getEtablissements();
    this.props.getTableauDeBoards();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { filiereEntity } = this.props;
      const entity = {
        ...filiereEntity,
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
    this.props.history.push('/entity/filiere');
  };

  render() {
    const { filiereEntity, etablissements, tableauDeBoards, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="pfumv10App.filiere.home.createOrEditLabel">
              <Translate contentKey="pfumv10App.filiere.home.createOrEditLabel">Create or edit a Filiere</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : filiereEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="filiere-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="filiere-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nomfiliereLabel" for="filiere-nomfiliere">
                    <Translate contentKey="pfumv10App.filiere.nomfiliere">Nomfiliere</Translate>
                  </Label>
                  <AvField id="filiere-nomfiliere" type="text" name="nomfiliere" />
                </AvGroup>
                <AvGroup>
                  <Label id="responsableLabel" for="filiere-responsable">
                    <Translate contentKey="pfumv10App.filiere.responsable">Responsable</Translate>
                  </Label>
                  <AvField id="filiere-responsable" type="text" name="responsable" />
                </AvGroup>
                <AvGroup>
                  <Label id="accreditaionLabel" for="filiere-accreditaion">
                    <Translate contentKey="pfumv10App.filiere.accreditaion">Accreditaion</Translate>
                  </Label>
                  <AvField id="filiere-accreditaion" type="text" name="accreditaion" />
                </AvGroup>
                <AvGroup>
                  <Label id="programmeLabel" for="filiere-programme">
                    <Translate contentKey="pfumv10App.filiere.programme">Programme</Translate>
                  </Label>
                  <AvInput
                    id="filiere-programme"
                    type="select"
                    className="form-control"
                    name="programme"
                    value={(!isNew && filiereEntity.programme) || 'LICENCE'}
                  >
                    <option value="LICENCE">{translate('pfumv10App.Programme.LICENCE')}</option>
                    <option value="MASTER">{translate('pfumv10App.Programme.MASTER')}</option>
                    <option value="MASTER_EXECUTIF">{translate('pfumv10App.Programme.MASTER_EXECUTIF')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="filiere-etablissement">
                    <Translate contentKey="pfumv10App.filiere.etablissement">Etablissement</Translate>
                  </Label>
                  <AvInput id="filiere-etablissement" type="select" className="form-control" name="etablissement.id">
                    <option value="" key="0" />
                    {etablissements
                      ? etablissements.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/filiere" replace color="info">
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
  etablissements: storeState.etablissement.entities,
  tableauDeBoards: storeState.tableauDeBoard.entities,
  filiereEntity: storeState.filiere.entity,
  loading: storeState.filiere.loading,
  updating: storeState.filiere.updating,
  updateSuccess: storeState.filiere.updateSuccess
});

const mapDispatchToProps = {
  getEtablissements,
  getTableauDeBoards,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FiliereUpdate);

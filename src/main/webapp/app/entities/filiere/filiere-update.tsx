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
import { getEntities as getAnneesInscription } from 'app/entities/annee-inscription/annee-inscription.reducer';
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
    this.props.getAnneesInscription();

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
    const { filiereEntity, etablissements, anneeInscriptions, tableauDeBoards, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="pfumApp.filiere.home.createOrEditLabel">Ajouter ou éditer une filière</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : filiereEntity} onSubmit={this.saveEntity}>
                <AvGroup>
                  <Label id="nomfiliereLabel" for="filiere-nomfiliere">
                    Nom filière
                  </Label>
                  <AvField
                    id="filiere-nomfiliere"
                    type="text"
                    name="nomfiliere"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="responsableLabel" for="filiere-responsable">
                    <Translate contentKey="pfumApp.filiere.responsable">Responsable</Translate>
                  </Label>
                  <AvField
                    id="filiere-responsable"
                    type="text"
                    name="responsable"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="accreditaionLabel" for="filiere-accreditaion">
                    Accréditation
                  </Label>
                  <AvField
                    id="filiere-accreditaion"
                    type="text"
                    name="accreditaion"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="programmeLabel" for="filiere-programme">
                    <Translate contentKey="pfumApp.filiere.programme">Programme</Translate>
                  </Label>
                  <AvInput
                    id="filiere-programme"
                    type="select"
                    className="form-control"
                    name="programme"
                    value={(!isNew && filiereEntity.programme) || 'LICENCE'}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  >
                    <option value="LICENCE">{translate('pfumApp.Programme.LICENCE')}</option>
                    <option value="MASTER">{translate('pfumApp.Programme.MASTER')}</option>
                    <option value="MASTER_EXECUTIF">{translate('pfumApp.Programme.MASTER_EXECUTIF')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="filiere-etablissement">
                    <Translate contentKey="pfumApp.filiere.etablissement">Etablissement</Translate>
                  </Label>
                  {etablissements
                    ? etablissements.map(otherEntity => (
                        <>
                          <AvField
                            id="filiere-responsable-label"
                            type="text"
                            name="etablissement.nomEcole"
                            value={otherEntity.nomEcole}
                            required
                            readOnly
                          />
                          <AvField id="filiere-responsable" type="hidden" name="etablissement.id" value={otherEntity.id} required />
                        </>
                      ))
                    : null}
                </AvGroup>
                <AvGroup>
                  <Label for="filiere-anneeInscription">Année académique</Label>
                  <AvInput
                    id="filiere-anneeInscription"
                    type="select"
                    className="form-control"
                    name="anneeInscription.id"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  >
                    <option value="" key="0" />
                    {anneeInscriptions
                      ? anneeInscriptions.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.annee}
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
  updateSuccess: storeState.filiere.updateSuccess,
  anneeInscriptions: storeState.anneeInscription.entities
});

const mapDispatchToProps = {
  getEtablissements,
  getTableauDeBoards,
  getAnneesInscription,

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

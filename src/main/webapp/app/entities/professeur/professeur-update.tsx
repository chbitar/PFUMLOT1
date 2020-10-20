import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntity, updateEntity, createEntity, reset } from './professeur.reducer';
import { IProfesseur } from 'app/shared/model/professeur.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProfesseurUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IProfesseurUpdateState {
  isNew: boolean;
  userId: string;
}

export class ProfesseurUpdate extends React.Component<IProfesseurUpdateProps, IProfesseurUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      userId: '0',
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

    this.props.getUsers();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { professeurEntity } = this.props;
      const entity = {
        ...professeurEntity,
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
    this.props.history.push('/entity/professeur');
  };

  render() {
    const { professeurEntity, users, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="pfumv10App.professeur.home.createOrEditLabel">
              <Translate contentKey="pfumv10App.professeur.home.createOrEditLabel">Create or edit a Professeur</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : professeurEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="professeur-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="professeur-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nomLabel" for="professeur-nom">
                    <Translate contentKey="pfumv10App.professeur.nom">Nom</Translate>
                  </Label>
                  <AvField id="professeur-nom" type="text" name="nom" />
                </AvGroup>
                <AvGroup>
                  <Label id="prenomLabel" for="professeur-prenom">
                    <Translate contentKey="pfumv10App.professeur.prenom">Prenom</Translate>
                  </Label>
                  <AvField id="professeur-prenom" type="text" name="prenom" />
                </AvGroup>
                <AvGroup>
                  <Label id="etablissementLabel" for="professeur-etablissement">
                    <Translate contentKey="pfumv10App.professeur.etablissement">Etablissement</Translate>
                  </Label>
                  <AvField id="professeur-etablissement" type="text" name="etablissement" />
                </AvGroup>
                <AvGroup>
                  <Label id="gradeLabel" for="professeur-grade">
                    <Translate contentKey="pfumv10App.professeur.grade">Grade</Translate>
                  </Label>
                  <AvField id="professeur-grade" type="text" name="grade" />
                </AvGroup>
                <AvGroup>
                  <Label id="diplomeLabel" for="professeur-diplome">
                    <Translate contentKey="pfumv10App.professeur.diplome">Diplome</Translate>
                  </Label>
                  <AvField id="professeur-diplome" type="text" name="diplome" />
                </AvGroup>
                <AvGroup>
                  <Label id="cinLabel" for="professeur-cin">
                    <Translate contentKey="pfumv10App.professeur.cin">Cin</Translate>
                  </Label>
                  <AvField id="professeur-cin" type="text" name="cin" />
                </AvGroup>
                <AvGroup>
                  <Label id="ribLabel" for="professeur-rib">
                    <Translate contentKey="pfumv10App.professeur.rib">Rib</Translate>
                  </Label>
                  <AvField id="professeur-rib" type="text" name="rib" />
                </AvGroup>
                <AvGroup>
                  <Label id="emailLabel" for="professeur-email">
                    <Translate contentKey="pfumv10App.professeur.email">Email</Translate>
                  </Label>
                  <AvField id="professeur-email" type="text" name="email" />
                </AvGroup>
                <AvGroup>
                  <Label for="professeur-user">
                    <Translate contentKey="pfumv10App.professeur.user">User</Translate>
                  </Label>
                  <AvInput id="professeur-user" type="select" className="form-control" name="user.id">
                    <option value="" key="0" />
                    {users
                      ? users.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/professeur" replace color="info">
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
  users: storeState.userManagement.users,
  professeurEntity: storeState.professeur.entity,
  loading: storeState.professeur.loading,
  updating: storeState.professeur.updating,
  updateSuccess: storeState.professeur.updateSuccess
});

const mapDispatchToProps = {
  getUsers,
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
)(ProfesseurUpdate);

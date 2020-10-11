import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './note-licence.reducer';
import { INoteLicence } from 'app/shared/model/note-licence.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INoteLicenceDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class NoteLicenceDetail extends React.Component<INoteLicenceDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { noteLicenceEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="pfumv10App.noteLicence.detail.title">NoteLicence</Translate> [<b>{noteLicenceEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="semestre">
                <Translate contentKey="pfumv10App.noteLicence.semestre">Semestre</Translate>
              </span>
            </dt>
            <dd>{noteLicenceEntity.semestre}</dd>
            <dt>
              <span id="noteCC1">
                <Translate contentKey="pfumv10App.noteLicence.noteCC1">Note CC 1</Translate>
              </span>
            </dt>
            <dd>{noteLicenceEntity.noteCC1}</dd>
            <dt>
              <span id="noteCC2">
                <Translate contentKey="pfumv10App.noteLicence.noteCC2">Note CC 2</Translate>
              </span>
            </dt>
            <dd>{noteLicenceEntity.noteCC2}</dd>
            <dt>
              <span id="noteFinal">
                <Translate contentKey="pfumv10App.noteLicence.noteFinal">Note Final</Translate>
              </span>
            </dt>
            <dd>{noteLicenceEntity.noteFinal}</dd>
            <dt>
              <span id="date">
                <Translate contentKey="pfumv10App.noteLicence.date">Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={noteLicenceEntity.date} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <Translate contentKey="pfumv10App.noteLicence.user">User</Translate>
            </dt>
            <dd>{noteLicenceEntity.user ? noteLicenceEntity.user.id : ''}</dd>
            <dt>
              <Translate contentKey="pfumv10App.noteLicence.module">Module</Translate>
            </dt>
            <dd>{noteLicenceEntity.module ? noteLicenceEntity.module.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/note-licence" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/note-licence/${noteLicenceEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ noteLicence }: IRootState) => ({
  noteLicenceEntity: noteLicence.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteLicenceDetail);

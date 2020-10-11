import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './note-executif.reducer';
import { INoteExecutif } from 'app/shared/model/note-executif.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INoteExecutifDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class NoteExecutifDetail extends React.Component<INoteExecutifDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { noteExecutifEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="pfumv10App.noteExecutif.detail.title">NoteExecutif</Translate> [<b>{noteExecutifEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="semestre">
                <Translate contentKey="pfumv10App.noteExecutif.semestre">Semestre</Translate>
              </span>
            </dt>
            <dd>{noteExecutifEntity.semestre}</dd>
            <dt>
              <span id="noteCC1">
                <Translate contentKey="pfumv10App.noteExecutif.noteCC1">Note CC 1</Translate>
              </span>
            </dt>
            <dd>{noteExecutifEntity.noteCC1}</dd>
            <dt>
              <span id="noteCC2">
                <Translate contentKey="pfumv10App.noteExecutif.noteCC2">Note CC 2</Translate>
              </span>
            </dt>
            <dd>{noteExecutifEntity.noteCC2}</dd>
            <dt>
              <span id="noteFinal">
                <Translate contentKey="pfumv10App.noteExecutif.noteFinal">Note Final</Translate>
              </span>
            </dt>
            <dd>{noteExecutifEntity.noteFinal}</dd>
            <dt>
              <span id="date">
                <Translate contentKey="pfumv10App.noteExecutif.date">Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={noteExecutifEntity.date} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <Translate contentKey="pfumv10App.noteExecutif.user">User</Translate>
            </dt>
            <dd>{noteExecutifEntity.user ? noteExecutifEntity.user.id : ''}</dd>
            <dt>
              <Translate contentKey="pfumv10App.noteExecutif.module">Module</Translate>
            </dt>
            <dd>{noteExecutifEntity.module ? noteExecutifEntity.module.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/note-executif" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/note-executif/${noteExecutifEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ noteExecutif }: IRootState) => ({
  noteExecutifEntity: noteExecutif.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteExecutifDetail);

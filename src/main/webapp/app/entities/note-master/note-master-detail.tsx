import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './note-master.reducer';
import { INoteMaster } from 'app/shared/model/note-master.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INoteMasterDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class NoteMasterDetail extends React.Component<INoteMasterDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { noteMasterEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="pfumv10App.noteMaster.detail.title">NoteMaster</Translate> [<b>{noteMasterEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="semestre">
                <Translate contentKey="pfumv10App.noteMaster.semestre">Semestre</Translate>
              </span>
            </dt>
            <dd>{noteMasterEntity.semestre}</dd>
            <dt>
              <span id="noteCC1">
                <Translate contentKey="pfumv10App.noteMaster.noteCC1">Note CC 1</Translate>
              </span>
            </dt>
            <dd>{noteMasterEntity.noteCC1}</dd>
            <dt>
              <span id="noteCC2">
                <Translate contentKey="pfumv10App.noteMaster.noteCC2">Note CC 2</Translate>
              </span>
            </dt>
            <dd>{noteMasterEntity.noteCC2}</dd>
            <dt>
              <span id="noteFinal">
                <Translate contentKey="pfumv10App.noteMaster.noteFinal">Note Final</Translate>
              </span>
            </dt>
            <dd>{noteMasterEntity.noteFinal}</dd>
            <dt>
              <span id="date">
                <Translate contentKey="pfumv10App.noteMaster.date">Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={noteMasterEntity.date} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <Translate contentKey="pfumv10App.noteMaster.user">User</Translate>
            </dt>
            <dd>{noteMasterEntity.user ? noteMasterEntity.user.id : ''}</dd>
            <dt>
              <Translate contentKey="pfumv10App.noteMaster.module">Module</Translate>
            </dt>
            <dd>{noteMasterEntity.module ? noteMasterEntity.module.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/note-master" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/note-master/${noteMasterEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ noteMaster }: IRootState) => ({
  noteMasterEntity: noteMaster.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteMasterDetail);

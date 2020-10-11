import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './tableau-de-board.reducer';
import { ITableauDeBoard } from 'app/shared/model/tableau-de-board.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITableauDeBoardDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class TableauDeBoardDetail extends React.Component<ITableauDeBoardDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { tableauDeBoardEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="pfumv10App.tableauDeBoard.detail.title">TableauDeBoard</Translate> [<b>{tableauDeBoardEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="tableauDeBoard">
                <Translate contentKey="pfumv10App.tableauDeBoard.tableauDeBoard">Tableau De Board</Translate>
              </span>
            </dt>
            <dd>{tableauDeBoardEntity.tableauDeBoard}</dd>
            <dt>
              <Translate contentKey="pfumv10App.tableauDeBoard.filier">Filier</Translate>
            </dt>
            <dd>
              {tableauDeBoardEntity.filiers
                ? tableauDeBoardEntity.filiers.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.nomfiliere}</a>
                      {i === tableauDeBoardEntity.filiers.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
            <dt>
              <Translate contentKey="pfumv10App.tableauDeBoard.calendrier">Calendrier</Translate>
            </dt>
            <dd>
              {tableauDeBoardEntity.calendriers
                ? tableauDeBoardEntity.calendriers.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.libelle}</a>
                      {i === tableauDeBoardEntity.calendriers.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/tableau-de-board" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/tableau-de-board/${tableauDeBoardEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ tableauDeBoard }: IRootState) => ({
  tableauDeBoardEntity: tableauDeBoard.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableauDeBoardDetail);

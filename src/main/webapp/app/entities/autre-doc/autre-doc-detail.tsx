import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './autre-doc.reducer';
import { IAutreDoc } from 'app/shared/model/autre-doc.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAutreDocDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class AutreDocDetail extends React.Component<IAutreDocDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { autreDocEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="pfumApp.autreDoc.detail.title">AutreDoc</Translate> [<b>{autreDocEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="titre">
                <Translate contentKey="pfumApp.autreDoc.titre">Titre</Translate>
              </span>
            </dt>
            <dd>{autreDocEntity.titre}</dd>
            <dt>
              <span id="data">
                <Translate contentKey="pfumApp.autreDoc.data">Data</Translate>
              </span>
            </dt>
            <dd>
              {autreDocEntity.data ? (
                <div>
                  <a onClick={openFile(autreDocEntity.dataContentType, autreDocEntity.data)}>
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                  <span>
                    {autreDocEntity.dataContentType}, {byteSize(autreDocEntity.data)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>
              <Translate contentKey="pfumApp.autreDoc.etudiantexec">Etudiantexec</Translate>
            </dt>
            <dd>{autreDocEntity.etudiantexec ? autreDocEntity.etudiantexec.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/autre-doc" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/autre-doc/${autreDocEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ autreDoc }: IRootState) => ({
  autreDocEntity: autreDoc.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AutreDocDetail);

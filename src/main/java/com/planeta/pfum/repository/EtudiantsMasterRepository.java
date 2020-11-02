package com.planeta.pfum.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.planeta.pfum.domain.EtudiantsMaster;


/**
 * Spring Data  repository for the EtudiantsMaster entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EtudiantsMasterRepository extends JpaRepository<EtudiantsMaster, Long>, JpaSpecificationExecutor<EtudiantsMaster> {

}

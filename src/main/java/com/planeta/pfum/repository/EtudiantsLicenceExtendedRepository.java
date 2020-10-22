package com.planeta.pfum.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import com.planeta.pfum.domain.EtudiantsLicence;
import com.planeta.pfum.domain.Filiere;


/**
 * Spring Data  repository for the EtudiantsLicence entity.
 */
@SuppressWarnings("unused")
@Repository("etudiantsLicenceExtendedRepository")
public interface EtudiantsLicenceExtendedRepository extends EtudiantsLicenceRepository{

    List<EtudiantsLicence> findAllByFiliere(Filiere fil);

	List<EtudiantsLicence> findAllByUserId(Long id);
}

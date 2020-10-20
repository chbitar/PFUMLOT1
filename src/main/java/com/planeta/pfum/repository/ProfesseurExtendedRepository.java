package com.planeta.pfum.repository;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.planeta.pfum.domain.Professeur;


/**
 * Spring Data  repository for the Professeur entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProfesseurExtendedRepository extends ProfesseurRepository {

    Optional<Professeur> findOneByUserId(Long id);
}

package com.planeta.pfum.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.planeta.pfum.domain.EspaceEtudiant;

/**
 * Spring Data  repository for the EspaceEtudiant entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EspaceEtudiantRepository extends JpaRepository<EspaceEtudiant, Long> {

    @Query("select espaceEtudiant from EspaceEtudiant espaceEtudiant where espaceEtudiant.user.login = ?#{principal.username}")
    List<EspaceEtudiant> findByUserIsCurrentUser();

}

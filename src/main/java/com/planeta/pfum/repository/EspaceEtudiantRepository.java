package com.planeta.pfum.repository;

import com.planeta.pfum.domain.EspaceEtudiant;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the EspaceEtudiant entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EspaceEtudiantRepository extends JpaRepository<EspaceEtudiant, Long> {

    @Query("select espaceEtudiant from EspaceEtudiant espaceEtudiant where espaceEtudiant.user.login = ?#{principal.username}")
    List<EspaceEtudiant> findByUserIsCurrentUser();

}

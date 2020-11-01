package com.planeta.pfum.repository;

import com.planeta.pfum.domain.FicheAbsence;
import com.planeta.pfum.domain.enumeration.Programme;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the FicheAbsence entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FicheAbsenceRepository extends JpaRepository<FicheAbsence, Long> {
    @EntityGraph(attributePaths = "absences")
	Optional<FicheAbsence> findAllWithAbsenceById(Long id);

	List<FicheAbsence> findAllByUserId(Long id);

	List<FicheAbsence> findAllByModuleId(Long module);

	List<FicheAbsence> findAllByUserIdAndModuleId(Long id, Long module);

	List<FicheAbsence> findAllByProgramme(Programme programme);

	List<FicheAbsence> findAllByUserIdAndProgramme(Long id, Programme programme);

}

package com.planeta.pfum.repository;

import com.planeta.pfum.domain.NoteExecutif;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the NoteExecutif entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NoteExecutifRepository extends JpaRepository<NoteExecutif, Long> {

    @Query("select noteExecutif from NoteExecutif noteExecutif where noteExecutif.user.login = ?#{principal.username}")
    List<NoteExecutif> findByUserIsCurrentUser();

}

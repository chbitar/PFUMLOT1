package com.planeta.pfum.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.planeta.pfum.domain.NoteExecutif;

/**
 * Spring Data  repository for the NoteExecutif entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NoteExecutifRepository extends JpaRepository<NoteExecutif, Long> {

    @Query("select noteExecutif from NoteExecutif noteExecutif where noteExecutif.user.login = ?#{principal.username}")
    List<NoteExecutif> findByUserIsCurrentUser();

}

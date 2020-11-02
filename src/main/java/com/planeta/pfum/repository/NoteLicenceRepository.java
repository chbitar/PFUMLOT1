package com.planeta.pfum.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.planeta.pfum.domain.NoteLicence;

/**
 * Spring Data  repository for the NoteLicence entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NoteLicenceRepository extends JpaRepository<NoteLicence, Long> {

    @Query("select noteLicence from NoteLicence noteLicence where noteLicence.user.login = ?#{principal.username}")
    List<NoteLicence> findByUserIsCurrentUser();

}

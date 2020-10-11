package com.planeta.pfum.repository;

import com.planeta.pfum.domain.NoteLicence;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the NoteLicence entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NoteLicenceRepository extends JpaRepository<NoteLicence, Long> {

    @Query("select noteLicence from NoteLicence noteLicence where noteLicence.user.login = ?#{principal.username}")
    List<NoteLicence> findByUserIsCurrentUser();

}

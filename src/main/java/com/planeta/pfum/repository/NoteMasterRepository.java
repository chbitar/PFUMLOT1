package com.planeta.pfum.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.planeta.pfum.domain.NoteMaster;

/**
 * Spring Data  repository for the NoteMaster entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NoteMasterRepository extends JpaRepository<NoteMaster, Long> {

    @Query("select noteMaster from NoteMaster noteMaster where noteMaster.user.login = ?#{principal.username}")
    List<NoteMaster> findByUserIsCurrentUser();

}

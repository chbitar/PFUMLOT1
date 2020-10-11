package com.planeta.pfum.repository;

import com.planeta.pfum.domain.NoteMaster;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the NoteMaster entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NoteMasterRepository extends JpaRepository<NoteMaster, Long> {

    @Query("select noteMaster from NoteMaster noteMaster where noteMaster.user.login = ?#{principal.username}")
    List<NoteMaster> findByUserIsCurrentUser();

}

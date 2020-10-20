package com.planeta.pfum.repository;

import com.planeta.pfum.domain.SuiviModule;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the SuiviModule entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SuiviModuleRepository extends JpaRepository<SuiviModule, Long> {

    @Query("select suiviModule from SuiviModule suiviModule where suiviModule.user.login = ?#{principal.username}")
    List<SuiviModule> findByUserIsCurrentUser();

    List<SuiviModule> findAllByUserId(Long id);
}

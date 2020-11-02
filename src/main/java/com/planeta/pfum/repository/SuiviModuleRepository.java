package com.planeta.pfum.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.planeta.pfum.domain.SuiviModule;

/**
 * Spring Data  repository for the SuiviModule entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SuiviModuleRepository extends JpaRepository<SuiviModule, Long>, JpaSpecificationExecutor<SuiviModule> {

    @Query("select suiviModule from SuiviModule suiviModule where suiviModule.user.login = ?#{principal.username}")
    List<SuiviModule> findByUserIsCurrentUser();

}

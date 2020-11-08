package com.planeta.pfum.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.planeta.pfum.domain.SuiviModule;
import com.planeta.pfum.service.dto.SuiviModuleGroupedByModule;

/**
 * Spring Data repository for the SuiviModule entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SuiviModuleExtendedRepository extends SuiviModuleRepository {

	@Query("select suiviModule from SuiviModule suiviModule where suiviModule.user.login = ?#{principal.username}")
	List<SuiviModule> findByUserIsCurrentUser();

	List<SuiviModule> findAllByUserId(Long id);

	List<SuiviModule> findAllByModuleId(Long moduleId);

	List<SuiviModule> findAllByUserIdAndModuleId(Long id, Long moduleId);
	
	@Query("select new com.planeta.pfum.service.dto.SuiviModuleGroupedByModule(suiviModule.module.id,suiviModule.module.nomModule,suiviModule.module.volumeHoraire,SUM(suiviModule.duree))  from SuiviModule suiviModule GROUP BY suiviModule.module")
	List<SuiviModuleGroupedByModule> findAllGroupedByModule();
	
	
	@Query("select new com.planeta.pfum.service.dto.SuiviModuleGroupedByModule(suiviModule.module.id,suiviModule.module.nomModule,suiviModule.module.volumeHoraire,SUM(suiviModule.duree))  from SuiviModule suiviModule where suiviModule.user.id=?1 GROUP BY suiviModule.module")
	List<SuiviModuleGroupedByModule> findAllGroupedByModule(Long userId);
	
	@Query("select new com.planeta.pfum.service.dto.SuiviModuleGroupedByModule(suiviModule.module.id,suiviModule.module.nomModule,suiviModule.module.volumeHoraire,SUM(suiviModule.duree))  from SuiviModule suiviModule where suiviModule.module.id=?1 GROUP BY suiviModule.module")
	List<SuiviModuleGroupedByModule> findAllGroupedByModuleByModuleId(Long idModule);
	
	@Query("select new com.planeta.pfum.service.dto.SuiviModuleGroupedByModule(suiviModule.module.id,suiviModule.module.nomModule,suiviModule.module.volumeHoraire,SUM(suiviModule.duree))  from SuiviModule suiviModule where suiviModule.module.id=?1 and suiviModule.user.id=?1 GROUP BY suiviModule.module")
	List<SuiviModuleGroupedByModule> findAllGroupedByModuleByModuleId(Long idModule,Long userId);

}

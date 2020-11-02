package com.planeta.pfum.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.planeta.pfum.domain.Authority;

/**
 * Spring Data JPA repository for the {@link Authority} entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {
}

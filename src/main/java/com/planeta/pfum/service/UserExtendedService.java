package com.planeta.pfum.service;

import java.time.Instant;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.CacheManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.planeta.pfum.config.Constants;
import com.planeta.pfum.domain.Authority;
import com.planeta.pfum.domain.User;
import com.planeta.pfum.repository.AuthorityRepository;
import com.planeta.pfum.repository.UserRepository;
import com.planeta.pfum.repository.search.UserSearchRepository;
import com.planeta.pfum.security.AuthoritiesConstants;
import com.planeta.pfum.service.util.RandomUtil;

@Service
@Transactional
public class UserExtendedService extends UserService {

	private final Logger log = LoggerFactory.getLogger(UserService.class);

	private final UserRepository userRepository;

	private final PasswordEncoder passwordEncoder;

	private final UserSearchRepository userSearchRepository;

	private final AuthorityRepository authorityRepository;

	private final CacheManager cacheManager;

	public UserExtendedService(UserRepository userRepository, PasswordEncoder passwordEncoder,
			UserSearchRepository userSearchRepository, AuthorityRepository authorityRepository,
			CacheManager cacheManager) {
		super(userRepository, passwordEncoder, userSearchRepository, authorityRepository, cacheManager);
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.userSearchRepository = userSearchRepository;
		this.authorityRepository = authorityRepository;
		this.cacheManager = cacheManager;
	}

	public User createUserForActeur(String email, String firstName, String lastName,String role) {
		User user = new User();
		user.setLogin(email);
		user.setFirstName(firstName);
		user.setLastName(lastName);
		user.setEmail(email);
		user.setLangKey(Constants.DEFAULT_LANGUAGE); // default language
		String encryptedPassword = passwordEncoder.encode("Maroc@2020");
		user.setPassword(encryptedPassword);
		user.setResetKey(RandomUtil.generateResetKey());
		user.setResetDate(Instant.now());
		user.setActivated(false);
		Set<Authority> authorities = new HashSet<>();
		authorityRepository.findById(role).ifPresent(authorities::add);
		user.setAuthorities(authorities);
		userRepository.save(user);
		this.clearUserCaches(user);
		log.debug("Created Information for User: {}", user);
		return user;
	}

	private void clearUserCaches(User user) {
		Objects.requireNonNull(cacheManager.getCache(UserRepository.USERS_BY_LOGIN_CACHE)).evict(user.getLogin());
		Objects.requireNonNull(cacheManager.getCache(UserRepository.USERS_BY_EMAIL_CACHE)).evict(user.getEmail());
	}

}

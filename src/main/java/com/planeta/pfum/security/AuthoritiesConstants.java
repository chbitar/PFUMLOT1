package com.planeta.pfum.security;

/**
 * Constants for Spring Security authorities.
 */
public final class AuthoritiesConstants {

    public static final String ADMIN = "ROLE_ADMIN";
    public static final String USER = "ROLE_USER";
    public static final String ANONYMOUS = "ROLE_ANONYMOUS";
    public static final String PROF ="ROLE_PROF";
    public static final String ETUDIANT_EXECUTIF = "ROLE_ETUDIANT_EXECUTIF";
    public static final String ETUDIANT_LICENCE = "ROLE_ETUDIANT_LICENCE";
    public static final String ETUDIANT_MASTER = "ROLE_ETUDIANT_MASTER";
    public static final String RESP_FINANCE = "ROLE_RESP_FINANCE";
    public static final String RESP_FILIERE = "ROLE_RESP_FILIERE";

    

    
    private AuthoritiesConstants() {
    }
}

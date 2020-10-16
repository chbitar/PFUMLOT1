package com.planeta.pfum.service.dto;

/**
 * View Model extending the UserDTO, which is meant to be used in the user management UI.
 */
public class MessageEmail {

    public static final int PASSWORD_MIN_LENGTH = 4;

    public static final int PASSWORD_MAX_LENGTH = 100;

//    @Size(min = PASSWORD_MIN_LENGTH, max = PASSWORD_MAX_LENGTH)
    private String sujet;

    private String objet;

    public MessageEmail() {
        // Empty constructor needed for Jackson.
    }


    public String getSujet() {
		return sujet;
	}


	public void setSujet(String sujet) {
		this.sujet = sujet;
	}

	public String getObjet() {
		return objet;
	}

	public void setObjet(String objet) {
		this.objet = objet;
	}


}

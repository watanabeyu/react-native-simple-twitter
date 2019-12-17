export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export type ErrorResponse = {
  errors: {
    code: number,
    message: string,
  }[]
}

export type RequestTokenResponse = {
  oauth_callback_confirmed: string,
  oauth_token: string,
  oauth_token_secret: string,
}

export type AccessTokenResponse = {
  oauth_token: string,
  oauth_token_secret: string,
  screen_name: string,
  user_id: string,
}

export type AccessToken = {
  oauth_token: string,
  oauth_token_secret: string,
}

export type TwitterUser = {
  created_at: string;
  default_profile_image: boolean;
  default_profile: boolean;
  description?: string | null;
  entities: {
    description: {
      urls?: {
        display_url?: string;
        expanded_url?: string;
        indices?: [number, number] | null;
        url: string;
      }[] | null
    };
    url?: {
      urls?: {
        display_url?: string;
        expanded_url?: string;
        indices?: [number, number] | null;
        url: string;
      }[] | null;
    } | null;
  };
  favourites_count: number;
  followers_count: number;
  friends_count: number;
  id_str: string;
  id: number;
  listed_count: number;
  location?: string | null;
  name: string;
  profile_banner_url?: string;
  profile_image_url_https: string;
  protected: boolean;
  screen_name: string;
  statuses_count: number;
  url?: string | null;
  verified: boolean;
  withheld_in_countries?: string[];
  withheld_scope?: string;
}

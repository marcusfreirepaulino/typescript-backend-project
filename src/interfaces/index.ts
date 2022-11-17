type options = Iuser | Isquad;
type uuid = string;
type columns = Array<string>

interface Iuser {
	id? : uuid,
	email? : string,
	username? : string,
	first_name? : string,
	last_name? : string,
	password? : string,
	squad? : uuid | null,
	is_admin? : boolean, 
	inactive? : boolean,
}

interface Isquad {
	id? : uuid,
	name? : string,
	leader? : uuid
}

interface resp<G> {
    err: Error | null,
    data: G | null, 
};


export { options, uuid, columns, Isquad, Iuser, resp }
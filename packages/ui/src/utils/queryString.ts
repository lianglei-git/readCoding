function parse(url: string = location.href) {
    return [...new URL(url).searchParams].reduce(
      (cur, [key, value]) => ((cur[key] = value), cur),
      {}
    );
  }
  

const queryString = {
    parse
}

export default queryString;
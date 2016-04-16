using UnityEngine;
using System.Collections;

// bossJamp.js
public class Boss : MonoBehaviour {
	public float				jumpPower;
	private Rigidbody2D			m_rigidbody2D;

	void Awake() {
		m_rigidbody2D = GetComponent<Rigidbody2D>();
	}

	void OnCollisionEnter2D(Collision2D collision) {
		if (collision.gameObject.tag == "Ground") {
			m_rigidbody2D.AddForce(Vector3.up * jumpPower);
		}
	}
}
